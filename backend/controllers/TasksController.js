import TaskModel from  '../models/Task.js'

export const getAllTasks = async (req, res) => {
    try {
        const userId = req.query.userId;
        const tasks = await TaskModel.find({ user: userId }).populate('user').exec();
        
        res.json(tasks)
    } catch (error) {
        handleUnexpectedError(error, res);
    }
}

export const deleteTask = async (req, res) => {
    const taskId = req.params.id;
  
    try {
      const doc = await TaskModel.findOneAndDelete({ _id: taskId });
  
      if (!doc) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json({ success: true });
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid task ID' });
      }
  
      handleUnexpectedError(error, res);
    }
};

export const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findOne({
            _id: taskId,
        }).populate('user').exec();

        if (!task) {
            return res.status(404).json({
                message: 'Task is not found'
            });
        }

        res.json(task)
    } catch (error) {
        handleUnexpectedError(error, res);
    }
}

export const createTask = async (req, res) => {
    try {
        const doc = new TaskModel({
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags,
            checked: req.body.checked,
            user: req.userId,
        })

        const task = await doc.save();

        res.json(task);
    } catch (error) {
        handleUnexpectedError(error, res);
    }
}

export const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const doc = await TaskModel.updateOne({
            _id: taskId
        }, {
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags,
            checked: req.body.checked,
            user: req.userId,
        })

        res.json({
            success: true
        });
    } catch (error) {
        handleUnexpectedError(error, res);
    }
}

function handleUnexpectedError(error, res) {
    console.error(error);
    res.status(500).json({ message: 'Error with task handling' });
}