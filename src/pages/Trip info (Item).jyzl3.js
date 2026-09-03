import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(() => {
  $w('#TripInfo').onReady(async () => {
    try {
      // Get the trip ID from the URL
      const tripId = wixLocation.path[1]; 
      if (!tripId) {
        console.error("No trip ID found in the URL");
        return;
      }
      //Filter the dataset based on the trip ID
      const dataset = $w('#TripInfo');
      await dataset.setFilter(wixData.filter().eq('_id', tripId));
      // Get the current item from the dataset
      const trip = dataset.getCurrentItem();
      
      if (!trip) {
        console.error("No trip found with ID:", tripId);
        return;
      }
      // Calculate calorie target and tag based on intensity
      const { dailyRate, calorieTag } = getCalorieTag(trip.intensityLevel[0]);
      // Update calorie display
      $w('#calorieTargetText').html = `<p style="font-size: 18px;">Estimated target: at least <strong>${dailyRate}</strong> calories/day</p>`;
      
      var requiredTags = [calorieTag];
      if (!trip.dietaryRestrictions.includes("No Restriction")) {
        requiredTags = requiredTags.concat(trip.dietaryRestrictions);
      }
      //filter
      await filterBlogPosts(requiredTags);
      
    } catch (error) {
      console.error("Main error:", error);
      $w('#fallbackText').html = "Error loading recommendations";
      $w('#fallbackText').show();
    }
  });
});

// Function to get calorie target and tag based on intensity level
function getCalorieTag(intensity) {
  const map = { Light: 2200, Moderate: 2800, Intense: 3400 };
  const dailyRate = map[intensity] || 2500;
  let calorieTag;
  if (dailyRate < 2400) calorieTag = "<500 Cal";
  else if (dailyRate < 3000) calorieTag = "500-800 Cal";
  else calorieTag = ">800 cal";
  return { dailyRate, calorieTag };
}

async function searchPostsByTagNames(tagNames) {
  // 1. Query the Tags collection for UUIDs
  const tagResult = await wixData.query("Blog/Tags")
    .hasSome("label", tagNames)
    .find();
  const tagIds = tagResult.items.map(tag => tag._id);
  // 2. Use those IDs to query Blog/Posts
  const postsResult = await wixData.query("Blog/Posts")
    .hasAll("tags", tagIds) // Or use hasSome() if partial match is OK
    .find();
  return postsResult.items;
}

// Function to filter blog posts based on required tags
async function filterBlogPosts(requiredTags) {
  try {
    const results = await searchPostsByTagNames(requiredTags);
    if (results.length) {
      $w('#fallbackText').hide();
      displayBlogPosts(results);
    } else {
      $w('#fallbackText').html = `<p style="font-size: 18px;">No matching recipes found. Try browsing all recipes!</p>`;
      $w('#fallbackText').show();
      $w('#recommendationRepeater').hide();
    }
  } catch (err) {
    console.error("Filter error:", err);
    $w('#fallbackText').html = "Error loading recipes";
    $w('#fallbackText').show();
  }
}

// Function to display filtered blog posts in the repeater
function displayBlogPosts(posts) {
  const rep = $w('#recommendationRepeater');
  rep.data = posts;
  rep.forEachItem(($item, itemData, i) => {
    $item('#postTitle').html = '<p style="font-size: 18px;">' + (itemData.title || `Recipe ${i + 1}`) + '</p>';
    if ($item('#readMoreButton')) {
      $item('#readMoreButton').label = "Read More →";
      $item('#readMoreButton').link = "/post/" + itemData.slug;
    }
  });
  rep.show();
}
