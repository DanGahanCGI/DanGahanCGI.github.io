const fs = require('fs');
const axios = require('axios');

async function generatePages(repo, sha) {
  try {
    const commits = await axios.get(`https://api.github.com/repos/${repo}/commits?sha=${sha}&per_page=100`);
    const commitData = commits.data;

    for (let i = 0; i < commitData.length; i++) {
      const commit = commitData[i];
      const commitDate = new Date(commit.commit.author.date);
      const commitDateString = commitDate.toISOString().replace(/[:\-]/g, '').slice(0, 14);

      // Generate version page content
      const versionPageContent = `---
layout: default
title: ${commit.commit.message}
---

Commit: [${commit.commit.message}](${commit.html_url})

`;

      // Write version page to file
      fs.writeFileSync(`FILENAME-update${commitDateString}.md`, versionPageContent);
    }
  } catch (error) {
    console.error('Error generating version pages:', error);
  }
}

generatePages(process.argv[2], process.argv[3]);
