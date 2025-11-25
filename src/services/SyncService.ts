import NetInfo from '@react-native-community/netinfo';
import { addToQueue, getQueue, removeFromQueue, updateBatchStatus } from './Database';
import api from './api';

export const syncQueue = async () => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) return;

    const queue = getQueue();
    if (queue.length === 0) return;

    for (const item of queue) {
        try {
            const body = JSON.parse(item.body);
            const headers = JSON.parse(item.headers);

            // Special handling for batch upload to update local status
            if (item.url.includes('/batches') && item.method === 'POST') {
                const response = await api.post(item.url, body, { headers });
                if (response.data && response.data.batch_id) {
                    // Assuming body has a localId or we can match it. 
                    // For simplicity, let's assume the body contains a temporary ID or we just rely on the queue order.
                    // But better: The queue item should probably store the related local entity ID.
                    // For this MVP, we will just process the request.
                    // If we want to update the local batch status, we need to know which one it was.
                    // Let's assume we passed 'local_id' in the body but remove it before sending?
                    // Or we just re-fetch everything from server after sync.
                }
            } else {
                await api.request({
                    method: item.method,
                    url: item.url,
                    data: body,
                    headers
                });
            }

            removeFromQueue(item.id);
        } catch (error) {
            console.error('Sync failed for item', item.id, error);
            // Keep in queue or implement retry count
        }
    }
};

export const scheduleSync = () => {
    // In a real app, use background fetch or event listeners
    NetInfo.addEventListener(state => {
        if (state.isConnected) {
            syncQueue();
        }
    });
};
