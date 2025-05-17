import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import obj2gltf from 'obj2gltf';
import { fileURLToPath } from 'url';
import gltfPipeline from 'gltf-pipeline';
const { processGltf } = gltfPipeline;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentdir = path.dirname(__dirname);


// еле работает с obj и не работает со всем остальным
export default class ModelCompresser {
  static async createMin(inputPath: string): Promise<void> {
    const uploadsDir = path.join(__parentdir, 'uploads');

    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input file not found: ${inputPath}`);
    }

    const ext = path.extname(inputPath).toLowerCase();
    const baseName = path.basename(inputPath, ext);
    const outputPath = path.join(uploadsDir, `${baseName}.glb`);

    const tempDir = path.join(__parentdir, 'temp');
    const tempGlb = path.join(tempDir, 'intermediate.glb');
    fs.mkdirSync(tempDir, { recursive: true });

    if (ext === '.obj') {
      const glbBuffer = await obj2gltf(inputPath, { binary: true });
      fs.writeFileSync(tempGlb, glbBuffer);
    } else {
      const assimpPath = path.join(__dirname, 'assimp.exe');
      console.log(assimpPath)
      try {
        execSync(`"${assimpPath}" export "${inputPath}" "${tempGlb}" -f glb2`);
      } catch (e) {
        throw new Error(`Assimp failed to convert ${inputPath}: ${e}`);
      }
    }

    const finalBuffer = fs.readFileSync(tempGlb);
    const compressed = await processGltf(finalBuffer, {
      dracoOptions: { compressionLevel: 10 }
    });

    fs.writeFileSync(outputPath, compressed.glb);
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}
