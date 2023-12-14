import { Story } from "../database/models.js";
import { Pet } from "../database/models.js";

export const storyHandlerFunctions = {
  getStories: async (req, res) => {
    try {
      const stories = await Story.findAll({
        order: [["userId", "ASC"]],
      });
      res.json({ success: true, stories });
    } catch (error) {
      console.log("Unable to get stories.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getStoriesByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const stories = await Story.findAll({
        where: { userId: userId },
      });
      res.json({ success: true, stories });
    } catch (error) {
      console.log("Unable to get stories.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  getStoryById: async (req, res) => {
    try {
      const { storyId } = req.params;
      const story = await Story.findByPk(storyId);
      res.json({ success: true, story });
    } catch (error) {
      console.log("Unable to get story by id.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  createStory: async (req, res) => {
    try {
      const { adoptionDate, content, userSubmittedImage, petId } = req.body;

      console.log(req.params);
      console.log(req.body);

      console.log(
        `Creating story for pet with id ${+petId} with adoptionDate ${adoptionDate} and an imgURL.`
      );

      // Create new pet
      const newStory = await Story.create({
        content,
        adoptionDate,
        userSubmittedImage,
      });

      // Find the appropriate pet to assign and assign it
      const pet = await Pet.findByPk(+petId);
      await newStory.setPet(pet);

      res.json({ success: true, newStory });
    } catch (error) {
      console.log("Unable to create story");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  editStory: async (req, res) => {
    try {
      const { storyId } = req.params;
      const { content, adoptionDate, userSubmittedImage, petId } = req.body;

      // Edit story fields
      const story = await Story.findByPk(storyId);
      story.content = content;
      story.adoptionDate = adoptionDate;
      story.userSubmittedImage = userSubmittedImage;

      // set story's pet
      const pet = await Pet.findByPk(petId);
      await story.setPet(pet);

      await story.save();

      res.json({ success: true, story });
    } catch (error) {
      console.log("Unable to edit story");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },

  deleteStory: async (req, res) => {
    try {
      const { storyId } = req.body;
      // console.log(`Attempting to delete story with id: ${storyId}`);
      const deletedStory = await Story.destroy({
        where: { storyId: storyId },
      });
      res.json({ success: true, deletedStory });
    } catch (error) {
      console.log("Unable to delete story.");
      console.log("Error", error);
      res.json({ success: false, error });
    }
  },
};
