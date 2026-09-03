$w.onReady(function () {
  // Ensure the repeater is populated with blog posts
  wixData.query("Blog/Posts")
    .find()
    .then((results) => {
      if (results.items.length > 0) {
        // Bind data to the repeater
        $w('#blog1').data = results.items;
      } else {
        console.log("No recipes found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching blog posts:", error);
    });

  // Add onItemReady to handle the display of each item in the repeater
  $w('#blog1').onItemReady(($item, itemData) => {
    // Assuming the title and description are populated by default settings
    
    // Access the tags of each blog post
    const tags = itemData.tags || [];
    
    // Join tags into a string and display them in the recipeTags element
    if (tags.length > 0) {
      $item('#recipeTags').text = tags.join(', '); // You can customize how you display tags here
    } else {
      $item('#recipeTags').text = "No tags available"; // If no tags, show this text or leave blank
    }
  });
});
