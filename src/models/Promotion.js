export default class Promotion {
  static get model() {
    return 'promotions';
  }

  static get schema() {
    return {
      id: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      days: [
        {
          day: {
            type: String,
            required: true,
          },
          times: [
            {
              type: String,
              required: true,
            },
          ],
        },
      ],
      field5Price: {
        type: String,
        required: true,
      },
      field8Price: {
        type: String,
        required: true,
      },
    };
  }
}

  
