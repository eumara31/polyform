import { Request, Response } from "express";
import ProductService from "../services/productService";
import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentdir = path.dirname(__dirname)

const getMimeType = (filename: string): string => {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case ".stl":
      return "model/stl";
    case ".obj":
      return "model/obj";
    case ".fbx":
      return "model/fbx";
    case ".amf":
      return "model/amf";
    case ".3mf":
      return "model/3mf";
    case ".ply":
      return "model/ply";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
};

export default class ProductController {
  static async getProductDescriptionById(req, res) {
    try {
      const { productId } = req.params;
      console.log(123)
      const result = await ProductService.getProductById(productId);
      res.status(200).json({
        text: {
          name: result.name,
          description: result.description,
          tags: result.tags,
          price: result.price,
          materials: result.materials,
          currency: result.currency,
          category: result.category,
          licence: result.licence,
          rating: result.rating,
          rating_votes: result.rating_votes,
          author: result.username
        }
      });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
 static async getProductBlobsById(req, res, blobType?: "model" | "images") {
  try {
    const { productId } = req.params;
    const result = await ProductService.getProductById(productId);
    
    const response: any = {};

    // Если тип не указан или запрошены оба типа данных
    if (!blobType) {
      response.model = {
        data: fs.readFileSync(__parentdir + `/uploads/${result.url}`).toString("base64"),
        name: result.url,
        type: getMimeType(result.url),
      };
      response.images = result.image_urls.map((imageUrl) => ({
        data: fs.readFileSync(__parentdir + `/uploads/${imageUrl}`).toString("base64"),
        name: imageUrl,
        type: getMimeType(imageUrl),
      }));
    }

    else if (blobType === "model") {
      response.model = {
        data: fs.readFileSync(__parentdir + `/uploads/${result.url}`).toString("base64"),
        name: result.url,
        type: getMimeType(result.url),
      };
    }

    else if (blobType === "images") {
      response.images = result.image_urls.map((imageUrl) => ({
        data: fs.readFileSync(__parentdir + `/uploads/${imageUrl}`).toString("base64"),
        name: imageUrl,
        type: getMimeType(imageUrl),
      }));
    }

    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}
static async getProductIds(req, res) {
  try {
    const ids = await ProductService.getProductIds(); // вызов из сервиса
    res.status(200).json({ ids });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
static async getProductIdsByQuery(req, res) {
  try {
    const query = req.body;
    const ids = await ProductService.getProductIdsByQuery(query);
    res.status(200).json({ ids });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
}
