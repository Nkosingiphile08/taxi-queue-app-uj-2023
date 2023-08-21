document.addEventListener('alpine:init', () => {
	Alpine.data('TaxiQueue', () => {
		return {
			version: 'api-1.0',
			queueLength: 0,
			taxiQueueLength: 0,
			async init() {
				await this.fetchQueueLength();
			},
			async fetchQueueLength() {
				try {
					const response = await axios.get('/api/passenger/queue');
					this.queueLength = response.data.queueCount;
				} catch (error) {
					console.error('Error fetching queue length:', error);
				}
			},
			async joinQueue() {
				try {
					await axios.post('/api/passenger/join');
					this.queueLength++;
				} catch (error) {
					console.error('Error joining the queue:', error);
				}
			},
			async leaveQueue() {
				if (this.queueLength > 0) {
					try {
						await axios.post('/api/passenger/leave');
						this.queueLength--;
					} catch (error) {
						console.error('Error leaving the queue:', error);
					}
				}
			},
			async joinTaxiQueue() {
				try {
					await axios.post('/api/taxi/join');
					this.taxiQueueLength++;
				} catch (error) {
					console.error('Error joining the taxi queue:', error);
				}
			},
			async taxiDepart() {
				if (this.queueLength >= 12) {
					try {
						await axios.post('/api/taxi/depart');
						this.taxiQueueLength -= 1;
						this.queueLength -= 12;
					} catch (error) {
						console.error('Error departing with taxi:', error);
					}
				}
			},
		};
	});
});