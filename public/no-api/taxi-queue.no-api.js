document.addEventListener('alpine:init', () => {
    Alpine.data('TaxiQueue', () => {
        return {
            version: 'no-api-1.0',
            queueCount: 0,
            taxiQueueCount: 0,
            joinQueue() {
                this.queueCount += 1;
            },
            leaveQueue() {
                if (this.queueCount > 0) {
                    this.queueCount -= 1;
                }
            },
            joinTaxiQueue() {
                this.taxiQueueCount += 1;
            },
			 queueLength() {
                return this.queueCount;
            },
            taxiQueueLength() {
                return this.taxiQueueCount;
            },
            taxiDepart() {
                if (this.queueCount >= 12) {
                    this.taxiQueueCount -= 1;
                    this.queueCount -= 12;
                }
            }
        };
    });
});
