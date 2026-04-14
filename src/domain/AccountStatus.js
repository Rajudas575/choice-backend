const AccountStatus = Object.freeze({
  PENDING_VERIFICATION: "PENDING_VERIFICATION", //--Account is created but not yet verified--//
  ACTIVE: "ACTIVE", //--Account is active and good standing--//
  SUSPENDED: "SUSPENDED", //--Acount is temporarily suspended--//
  DEACTIVATED: "DEACTIVATED", //--Acount is deactivated by the user--//
  BANNED: "BANNED", //--Account is permanently banned--/
  CLOSED: "CLOSED", //--Account is permanently closed--//
});

export default AccountStatus;
