import e, { response } from "express";
import Event from "../models/event.model.js";

export const getEvents = async (req, res = response) => {
  try {
    const events = await Event.find().populate("user", "name");

    res.status(200).send({
      ok: true,
      events: events,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      ok: false,
      msg: e.message,
    });
  }
};

export const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const saveEvent = await event.save();
    res.status(201).send({
      ok: true,
      event: saveEvent,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      ok: false,
      msg: e.message,
    });
  }
};

export const updateEvent = async (req, res = response) => {

  const eventId = req.params.id;
  const uid = req.uid

  try {
    const event = await Event.findById(eventId);
    if (!event) {
     return res.status(404).send({
        ok: false,
        msg: "The event id does not exist",
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).send({
        ok: false,
        msg:"You don't have privileges to edit this event"
      })
    }
    const newEvent = {
      ...req.body,
      user: uid
    }
    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new:true})

    res.status(202).send({
      ok: true,
      msg: "The event was updated succesfully",
      event: updatedEvent
    })

  } catch (e) {
    res.status(500).send({
      ok: false,
      msg: e.message,
    });
  }
};

export const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id
  const uid = req.uid
  try {
    const event = await Event.findById(eventId)
    if (!event) {
     return res.status(404).send({
        ok: false,
        msg: "The event id does not exist",
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).send({
        ok: false,
        msg:"You don't have privileges to delete this event"
      })
    }
    await Event.findByIdAndDelete(eventId)
    res.status(200).send({
      ok: true,
      msg: "The event was deleted",
    });
  }
  catch (e) {
    res.status(500).send({
      ok: false,
      msg:e.message
    })
  }
 
};
