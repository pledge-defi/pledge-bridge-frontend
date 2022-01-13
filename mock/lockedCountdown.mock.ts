// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /lockedCountdown': (req: Request, res: Response) => {
    res
      .status(200)
      .send({ time: '龙华说己在眼价备面空极教回。', timestamp: '存发圆张平品约集图领质解红养。' });
  },
};
