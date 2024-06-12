const { getDb } = require('../db/connect');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

class User {
    constructor(data) {
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.googleId = data.googleId || null;
        this.accountType = data.accountType || 'normal';
        this.isAdmin = data.isAdmin || false; // Default to false if not provided
    }

    async save() {
        const db = getDb();
        const usersCollection = db.collection('users');
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        try {
            const result = await usersCollection.insertOne(this);
            console.log('User saved:', result.ops); // Log the inserted document(s)
            return result.ops;
        } catch (error) {
            console.error('Error saving user:', error); // Log any error that occurs
            throw error;
        }
    }

    static async findOne(query) {
        const db = getDb();
        const usersCollection = db.collection('users');
        return await usersCollection.findOne(query);
    }

    static async findById(id) {
        const db = getDb();
        const usersCollection = db.collection('users');
        return await usersCollection.findOne({ _id: new ObjectId(id) });
    }
}

module.exports = User;