const request = require("supertest");
const express = require("express");
const app = express();

describe("Tests pour les routes de l'API", () => {
  beforeEach(() => {});

  afterEach(() => {});

  it("Devrait obtenir tous les produits", (done) => {
    request(app)
      .get("/api/products")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.be.an("array");
        done();
      });
  });

  it("Devrait obtenir un produit par ID", (done) => {
    const productId = "votre_id_de_test_valide";

    request(app)
      .get(`/api/products/${productId}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.be.an("object");
        res.body.should.have.property("_id", productId);
        done();
      });
  });
});
