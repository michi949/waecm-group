export function getFeedItemsFromLocalStorage(setFeedItems: React.Dispatch<React.SetStateAction<any[]>>) {
    let feedItemLocal = JSON.parse(localStorage.getItem("feedItems"));
    if (feedItemLocal) {
      setFeedItems(feedItemLocal);
    }
}