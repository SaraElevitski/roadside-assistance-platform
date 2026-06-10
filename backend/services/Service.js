const { HttpResponse } = require("../helper/HttpResponse.js");
class Service {
  constructor(repo) {
    this.repo = repo;
    console.log("Constructor called for service:", this.constructor.name); // יגיד לנו איזה סרוויס זה
    console.log("Checking repo in constructor:", this.repo);
  }

  async getAll(query) {
    const item = await this.repo.getAll(query);
    if (!item) {
      const error = new Error(" item  not found");
      error.statusCode = 404;
      throw error;
    }

    return new HttpResponse(item);
  }

  async findOne(query) {
    const item = await this.repo.findOne(query);
    if (!item) {
      const error = new Error(" item  not found");
      error.statusCode = 404;
      throw error;
    }

    return new HttpResponse(item);
  }




  async getById(id) {
    const item = await this.repo.getById(id);
    if (!item) {
      const error = new Error(" item  not found");
      error.statusCode = 404;
      throw error;
    }

    return new HttpResponse(item);
  }

  async update(id, data) {
    const item = await this.repo.update(id, data);
    if (!item) {
      const error = new Error(" item  not found");
      error.statusCode = 404;
      throw error;
    }
    return new HttpResponse(item);
  }

  async create(data) {
    const item = await this.repo.create(data);
    if (item) {
      return new HttpResponse(item);
    }
    throw new Error("Error creating item");
  }

  async delete(id) {
    const item = await this.repo.delete(id);
    if (item) {
      // , { statusCode: 200, message: "הפריט נמחק בהצלחה" }
      return new HttpResponse(item);
    }
    const error = new Error("Item not found or already deleted");
    error.statusCode = 404;
    throw error;
  }
}

module.exports = Service;
