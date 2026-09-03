// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction

$w.onReady(function () {

$w('#selectionTags1').onChange((event) => {
       const indeces = $w('#selectionTags1').selectedIndices;
       const singleIndex = indeces.slice(-1);
       $w('#selectionTags1').selectedIndices = singleIndex
   })

});