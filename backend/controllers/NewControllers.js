
const News = require("../models/News");
const {mongoose} = require("mongoose");


const NewsController = {
  
index: async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = 6;

    // Get the total number of documents first
    let totalDocuments = await News.countDocuments();
    let totalPages = Math.ceil(totalDocuments / limit);

    // Prevent invalid page numbers
    page = Math.max(1, Math.min(page, Math.max(totalPages, 1)));

    // Fetch news for the current page
    let news = await News.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ updatedAt: -1 });

    // Create pagination data
    let dataLink = {
      previous: page === 1 ? false : true,
      current: page,
      next: page < totalPages,
      looplink: [],
    };

    // Generate page links
    for (let i = 1; i <= totalPages; i++) {
      dataLink.looplink.push({ loopnumber: i });
    }

    return res.status(200).json({
      news,
      dataLink,
      totalPages,
      totalDocuments,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch news",
      error: error.message,
    });
  }
},

  store: async (req, res) => {
    try {
      const { title, description, author, type } = req.body;

      const newsBig = await News.create({
        title,
        description,
        author,
        type,
        image: req.file ? `/uploads/${req.file.filename}` : ""
      });

      return res.status(201).json(newsBig);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to create news",
        error: error.message
      });
    }
  },

  show: async (req, res) => {
   try {
    let id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({ message: "Invalid news ID" });
    }   
    let news = await News.findById(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    return res.status(200).json(news);
   } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve news",
      error: error.message
    });
   }
  },

  patch: async (req, res) => {
    let id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({ message: "Invalid news ID" });
    }
    const updates = { ...req.body };
    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    }
    let news = await News.findByIdAndUpdate(id, updates, { new: true });
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    return res.status(200).json(
        {
            data: news,
            message: "News updated successfully"
        }
    );

    
  },

  destroy: async (req, res) => {
    let id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({ message: "Invalid news ID" });
    }
    let news = await News.findByIdAndDelete(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    return res.status(200).json(
        {
            data: news,
            message: "News deleted successfully"
        }
    );
  }
};

module.exports = NewsController;
