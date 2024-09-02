// src/component/entities/NiceAccountNumber.js
class NiceAccountNumber {
    static Status = {
      ACTIVE: "Active",
      INACTIVE: "Inactive"
    };
  
    constructor(
      niceAccountNumberId,
      niceAccountNumber,
      status,
      createdAt,
      updatedAt
    ) {
      this.niceAccountNumberId = niceAccountNumberId;
      this.niceAccountNumber = niceAccountNumber;
      this.status = status;
      this.createdAt = createdAt; // ISO Date string or Date object
      this.updatedAt = updatedAt; // ISO Date string or Date object
    }
  }
  
  export default NiceAccountNumber;
  