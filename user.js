// Single instance of a user.

const User = function(id, username, passwordHash, email, xp, bio, joinDate) {
    this.id = id;
    this.username = username;
    this.passwordHash = passwordHash;
    this.email = email;
    this.xp = xp;
    this.bio = bio;
    this.joinDate = joinDate;
};

module.exports = User;