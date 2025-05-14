import Assimp from "assimpjs";
import fs from "fs";
import path from "path";
import { NodeIO } from "@gltf-transform/core";
import { weld } from "@gltf-transform/functions";

// сжимает 3д-модели (100мб-1гб) до приемлемых для отправки по сети размеров (1мб-10мб) для предпросмотра

export default class ModelCompressor {
  static async createMin(inputPath: string, outputPath: string) {
    const assimp = await Assimp();
    const buffer = fs.readFileSync(inputPath);
    const name = path.basename(inputPath);
    const file = new assimp.File();
    const scene = assimp.ReadFile(file);

    if (!scene || !scene.IsValid()) {
      throw new Error("Failed to load model");
    }

    const tmpGltfName = path.basename(inputPath, path.extname(inputPath)) + ".gltf";
    const tmpGltfPath = path.join(outputPath, tmpGltfName);
    const exportSuccess = assimp.ExportFile(scene, tmpGltfPath, "gltf2");

    if (!exportSuccess) {
      throw new Error("GLTF export failed");
    }

    const io = new NodeIO();
    const doc = await io.read(tmpGltfPath);
    await doc.transform(weld());

    const glbName = path.basename(inputPath, path.extname(inputPath)) + ".glb";
    const glbFullPath = path.join(outputPath, glbName);
    const glbBinary = await io.writeBinary(doc);
    
    fs.writeFileSync(glbFullPath, glbBinary);
    fs.unlinkSync(tmpGltfPath);

    return glbFullPath;
  }
}
