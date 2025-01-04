const Event = require('../models/Event');


const getEvents = async (req, res) => {

    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        msg: "getEvents",
        data: {
            events
        }
    });
}

const createEvent = async (req, res) => {

    const { body } = req;

    const event = new Event(body);

    try {

        event.user = req.uid;

        await event.save();

        return res.json({
            ok: true,
            data: {
                event
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
}

const updateEvent = async (req, res) => {

    const { id } = req.params;

    const { body, uid } = req;

    try {

        const event = await Event.findById(id);

        if (!event) return res.status(404).json({
            ok: false,
            msg: "Evento no encontrado"
        });

        if (event.user.toString() !== uid) return res.status(401).json({
            ok: false,
            msg: "No tiene privilegio de editar este evento"
        });

        const newEvent = {
            ...body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, newEvent, { new: true });


        res.json({
            ok: true,
            msg: "updateEvent",
            data: {
                oldEvent: event,
                newEvent: updatedEvent
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
}

const deleteEvent = async (req, res) => {

    const { id } = req.params;

    const { uid } = req;

    try {

        const event = await Event.findById(id);

        if (!event) return res.status(404).json({
            ok: false,
            msg: "Evento no encontrado"
        });

        if (event.user.toString() !== uid) return res.status(401).json({
            ok: false,
            msg: "No tiene privilegio de editar este evento"
        });

        await Event.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: "deleteEvent",
            data: {
                event
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }

}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
