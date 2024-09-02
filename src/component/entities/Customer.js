class Customer {
    constructor(
      id,
      name,
      email,
      customerId,
      firstName,
      lastName,
      phoneNumber,
      dob,
      address,
      identityCard,
      customerSegmentId,
      createdAt,
      updatedAt
    ) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.customerId = customerId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.phoneNumber = phoneNumber;
      this.dob = dob; // Date of Birth
      this.address = address;
      this.identityCard = identityCard;
      this.customerSegmentId = customerSegmentId;
      this.createdAt = createdAt; // ISO Date string or Date object
      this.updatedAt = updatedAt; // ISO Date string or Date object
    }
  }
  
  export default Customer;
  