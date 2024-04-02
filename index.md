---
title: Apprenticeships, Skills, Children and Learning Act 2009
subtitle: Section 134
---
This page is based on the examples here - [Example](https://www.legislation.gov.uk/ukpga/2009/22/section/134)

{:start="134"}
1. General conditions of recognition
   1. Ofqual must set and publish the general conditions to which a recognition is to be subject.
   2. Different general conditions may be set for—
      1. recognition of different descriptions of awarding bodies;
      2. recognition in respect of different qualifications or different descriptions of qualifications;
      3. recognition in respect of credits in respect of different components of qualifications or different descriptions of components of qualifications.
   3. Ofqual may revise the general conditions.
   4. If Ofqual revises the general conditions it must publish them as revised.
   5. Before setting or revising the general conditions Ofqual must consult such persons as it considers appropriate.

| Commencement Information |
| :-------------------------- |
| I1	S. 134 in force at 1.4.2010 by [S.I. 2010/1151](https://www.legislation.gov.uk/id/uksi/2010/1151), [art. 2](https://www.legislation.gov.uk/id/uksi/2010/1151/article/2), [Sch.1](https://www.legislation.gov.uk/id/uksi/2010/1151/schedule/1) |


---

*Revisions below:*

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script>
$.ajax({
  url: 'https://api.github.com/repos/DanGahanCGI/DanGahanCGI.github.io/commits?path=<path_to_file>&per_page=100',
  dataType: 'json',
  success: function(data) {
    var commits = data.reverse(); // Reverse the commit order to display from oldest to newest
    var prevCommit = null;

    $.each(commits, function(i, item) {
      var commitUrl = 'https://github.com/' + 'DanGahanCGI' + '/' + 'DanGahanCGI.github.io'' + '/commit/' + item.sha;
      var diffUrl = prevCommit ? 'https://github.com/' + 'DanGahanCGI' + '/' + 'DanGahanCGI.github.io'' + '/compare/' + item.sha + '...' + prevCommit : null;

      $('ul#commit-history').append('<li>' +
        '<a href="' + commitUrl + '" target="_blank">' + item.commit.author.name + ' committed on ' + item.commit.author.date + ': ' + item.commit.message + '</a>' +
        (diffUrl ? ' (<a href="' + diffUrl + '" target="_blank">View diff</a>)' : '') +
        '</li>');

      prevCommit = item.sha;
    });
  }
});

</script>
<ul id="commit-history"></ul>

---


