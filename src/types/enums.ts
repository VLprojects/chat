export enum MessageTypeEnum {
  System = 'system',
  User = 'user',
}

export enum ChannelTypeEnum {
  Public = 'public',
  Private = 'private',
  Direct = 'direct',
  Blank = 'blank',
}

export enum UserRoleEnum {
  User = 'user',
  Moderator = 'moderator',
}

export enum AuthModeEnum {
  // All disabled
  Mode1 = 1,

  // Guest
  Mode2 = 2,

  // Unregistered users
  Mode3 = 3,

  // Unregistered users, guest
  Mode4 = 4,

  // Register
  Mode5 = 5,

  // Register, guest
  Mode6 = 6,

  // Register, unregistered users
  Mode7 = 7,

  // Register, unregistered users, guest
  Mode8 = 8,
}
