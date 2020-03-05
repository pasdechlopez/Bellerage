  //destructors
  
  
  const {
      x,
      ...val
    } = params;

    const val = {
      ...params,
      y: {
        ...params.y
      }
    }

    const val = params;

    const val = {};

    params = {
      x: 1,
      y: {
        z: 2
      }
    }


    val = {
      x: 1,
      y: {
        z: 2
      }
    }

    val.x = 2;

    val.y.z = 5;

    val.y = param.y;
