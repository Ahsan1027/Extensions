function reactToPosts() {
  chrome.storage.local.get(["currentReaction"], function (data) {
    const reactionToApply = data.currentReaction;

    if (reactionToApply) {
      let ignorePostsParents = Array.from(document.querySelectorAll('.x6s0dn4.x78zum5.x1q0g3np.xod5an3.x1pi30zi.x1swvt13.xz9dl7a')).map(node => node.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);

      let allPosts = document.querySelectorAll(".x1yztbdb.x1n2onr6.xh8yej3.x1ja2u2z");
      const filteredPosts = Array.from(allPosts).filter(post => !ignorePostsParents.includes(post));

      for (let i = 0; i < filteredPosts.length; i++) {
        const post = filteredPosts[i];
        let unique = post.querySelectorAll('[aria-labelledby]')[0].getAttribute('aria-labelledby');

        chrome.storage.local.get(unique, function (result) {
          if (!result[unique] || !result[unique].isReacted) {
            let clicked = post.querySelector("[aria-label=Like]");
            console.log('\n\n', { clicked });

            let updateObj = {};
            updateObj[unique] = {
              reaction: reactionToApply,
              isReacted: true
            };

            chrome.storage.local.set(updateObj, function () {
              console.log(`Reaction set to ${reactionToApply} for post ${unique}`);
            });
          }
        });
      }
    }
  });
}

window.addEventListener('scroll', reactToPosts);