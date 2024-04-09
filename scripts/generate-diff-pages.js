const fs = require('fs');
const axios = require('axios');

async function getMarkdownFiles(repo) {
  try {
    const files = await axios.get(`https://api.github.com/repos/${repo}/contents`);
    const markdownFiles = files.data.filter(file => file.name.endsWith('.md'));
    return markdownFiles.map(file => file.name);
  } catch (error) {
    console.error('Error getting markdown files:', error);
    return [];
  }
}

async function getCommitsForFile(repo, file) {
  try {
    const commits = await axios.get(`https://api.github.com/repos/${repo}/commits?path=${file}&per_page=2`);
    return commits.data;
  } catch (error) {
    console.error(`Error getting commits for ${file}:`, error);
    return [];
  }
}

async function generateDiffPages(repo) {
  try {
    const markdownFiles = await getMarkdownFiles(repo);

    for (const file of markdownFiles) {
      const commits = await getCommitsForFile(repo, file);
      if (commits.length < 2) {
        console.warn(`Skipping ${file}: Less than 2 commits found`);
        continue;
      }

      const latestCommitSha = commits[0].sha;
      const secondLatestCommitSha = commits[1].sha;

      const latestFileContent = await getFileContentAtCommit(repo, file, latestCommitSha);
      const secondLatestFileContent = await getFileContentAtCommit(repo, file, secondLatestCommitSha);

      const diffContent = generateDiffMarkdown(file, latestFileContent, secondLatestFileContent);
      fs.writeFileSync(`${file.replace('.md', '')}-diff.md`, diffContent);
    }
  } catch (error) {
    console.error('Error generating diff pages:', error);
  }
}

async function getFileContentAtCommit(repo, file, commitSha) {
  try {
    const fileContent = await axios.get(`https://api.github.com/repos/${repo}/contents/${file}?ref=${commitSha}`);
    return Buffer.from(fileContent.data.content, 'base64').toString();
  } catch (error) {
    console.error(`Error getting content of ${file} at commit ${commitSha}:`, error);
    return '';
  }
}

function generateDiffMarkdown(file, latestContent, secondLatestContent) {
  const diff = require('diff');

  const changes = diff.diffLines(secondLatestContent, latestContent);
  let diffMarkdown = `# ${file}\n\n`;

  diffMarkdown += '## Current Version:\n\n```diff\n';
  changes.forEach(part => {
    const prefix = part.added ? '+ ' : part.removed ? '- ' : '  ';
    diffMarkdown += prefix + part.value + '\n';
  });
  diffMarkdown += '```\n\n';

  diffMarkdown += '## Previous Version:\n\n```diff\n';
  changes.forEach(part => {
    const prefix = part.removed ? '+ ' : part.added ? '- ' : '  ';
    diffMarkdown += prefix + part.value + '\n';
  });
  diffMarkdown += '```\n';

  return diffMarkdown;
}

generateDiffPages(process.argv[2]);
