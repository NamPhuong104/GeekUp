class CustomerSegment {
    constructor(
        customerSegmentId,
        customerSegmentType,
        createdAt,
        updatedAt
    ) {
        this.customerSegmentId = customerSegmentId; 
        this.customerSegmentType = customerSegmentType; 
        this.createdAt = createdAt; // ISO Date string or Date object
        this.updatedAt = updatedAt; // ISO Date string or Date object
    }
}

export default CustomerSegment;
