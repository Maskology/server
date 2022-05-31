import { Request, Response } from "express";
import * as tf from "@tensorflow/tfjs-node";

export default class ModelController {
  static async predict({ file, path }: { file: any; path: string }) {
    const IMG_SIZE = [128, 128] as [number, number];

    let pattern = /image\/(jpeg|png|jpg)/;
    if (!pattern.test(file.mimetype)) {
      throw new Error("File type not supported");
    }
    const tensor = tf.node.decodeImage(file.buffer);
    const model = await tf.loadGraphModel(path);
    const prediction = model.predict(
      tensor.resizeBilinear(IMG_SIZE).expandDims(0)
    ) as tf.Tensor;

    const predictionArray = Array.from(prediction.dataSync());
    const labels = [
      "barong",
      "bujuh",
      "dalem",
      "keras",
      "rangda",
      "sidakarya",
      "tua",
    ].sort();

    const result = predictionArray.map((prediction, index) => {
      return {
        label: labels[index],
        value: prediction,
      };
    });

    return result;
  }

  static async getPrediction(req: Request, res: Response) {
    try {
      const result = await ModelController.predict({
        file: req.file,
        path: process.env.MODEL_URL!,
      });
      return res.status(200).json({ result });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
