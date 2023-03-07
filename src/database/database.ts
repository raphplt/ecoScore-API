const mongoose = require("mongoose");
const User = require("./models/User");

// Connexion à la base de données MongoDB
mongoose.connect("mongodb://localhost:27017/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Création d'un utilisateur
const user = new User({
  name: "John Doe",
  email: "john.doe@example.com",
  password: "password123",
});

// Sauvegarde de l'utilisateur dans la base de données
user.save((err: any, user: any) => {
  if (err) {
    console.log(err);
  } else {
    console.log(user);
  }
});
