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

async function generateVersionPages(repo) {
  try {
    const markdownFiles = await getMarkdownFiles(repo);

    for (const file of markdownFiles) {
      const commits = await axios.get(`https://api.github.com/repos/${repo}/commits?path=${file}&per_page=100`);
      const commitData = commits.data;

      const fileName = file.replace('.md', '');
      let versionPageContent = `## ${fileName} Version History\n\n`;

      for (const commit of commitData) {
        const commitDate = new Date(commit.commit.author.date);
        const commitDateString = commitDate.toISOString().replace(/[:\-]/g, '').slice(0, 14);
        const commitUrl = `https://github.com/${repo}/commit/${commit.sha}`;
        const diffUrl = commit.parents.length ? `https://github.com/${repo}/compare/${commit.parents[0].sha}...${commit.sha}` : null;

        versionPageContent += `* [${commit.commit.author.name} committed on ${commitDate.toLocaleString()}: ${commit.commit.message}](${commitUrl})`;
        if (diffUrl) {
          versionPageContent += ` ([View diff](${diffUrl}))`;
        }
        versionPageContent += '\n';
      }

      fs.writeFileSync(`${fileName}-versions.md`, versionPageContent);
    }
  } catch (error) {
    console.error('Error generating version pages:', error);
  }
}

generateVersionPages(process.argv[2]);
