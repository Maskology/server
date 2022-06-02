import { Request, Response } from "express";
import * as tf from "@tensorflow/tfjs-node";
import { GraphModel } from "@tensorflow/tfjs-node";

// Import the model first
// Refrence https://github.com/tensorflow/tfjs/issues/6019#issuecomment-1086427992
let model: GraphModel;
(async () => {
  model = await tf.loadGraphModel(process.env.MODEL_PATH!);
})();

export default class ModelController {
  static predict({ file }: { file: any }) {
    // Declare an input tensor for the model.
    const IMG_SIZE = [280, 280] as [number, number];

    // Check the image type
    let pattern = /image\/(jpeg|png|jpg)/;
    if (!pattern.test(file.mimetype)) {
      throw new Error("File type not supported");
    }

    const result = tf.tidy(() => {
      // Load the image from a file and make it a tensor.
      const tensor = tf.node.decodeImage(file.buffer);
      const prediction = model.predict(
        tensor.resizeBilinear(IMG_SIZE).expandDims(0)
      ) as tf.Tensor;

      const predictionArray = Array.from(prediction.dataSync());
      const labels = [
        "barong",
        "bujuh",
        "dalem",
        "keras",
        "sidakarya",
        "tua",
      ].sort();

      const predictionResult = predictionArray.map((prediction, index) => {
        return {
          label: labels[index],
          value: prediction,
        };
      });

      return predictionResult;
    });
    return result;
  }

  static async getPrediction(req: Request, res: Response) {
    try {
      const result = await ModelController.predict({ file: req.file });
      return res.status(200).json({ result });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
