export function saveFeedItemsToLocalStorage(feedItems: any[]) {
    const savedFeedItems = JSON.stringify(feedItems);
    localStorage.setItem("feedItems", savedFeedItems);
}