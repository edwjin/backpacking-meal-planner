// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixData from 'wix-data';
import wixUsers from 'wix-users';
import wixLocation from 'wix-location';
import { session } from 'wix-storage';

$w.onReady(() => {
    console.log("onReady")
    const currentUrl = wixLocation.url;
    let lastVisitedUrl = session.getItem('lastVisitedUrl');

    if (lastVisitedUrl && currentUrl !== lastVisitedUrl) {
        
        wixLocation.to(currentUrl);
    }

    wixLocation.onChange(() => {
        console.log('User navigated away and came back!');
        filterTripsForCurrentUser(); // Call your function again
    });
   
    session.setItem('lastVisitedUrl', currentUrl);

    
    filterTripsForCurrentUser();
});

function filterTripsForCurrentUser() {
    const currentUser = wixUsers.currentUser;

    if (currentUser.loggedIn) {
        const userId = currentUser.id; 
        console.log('Current User ID:', userId);

        wixData.query('Trip info') 
            .eq('Owner', userId) 
            .find()
            .then((results) => {
                console.log('Filtered Results:', results.items);
                $w('#listRepeater').data = results.items; 
            })
            .catch((error) => {
                console.error('Error fetching trips:', error);
            });
    } else {
        console.log('No user logged in.');
        $w('#listRepeater').data = []; 
    }
}
