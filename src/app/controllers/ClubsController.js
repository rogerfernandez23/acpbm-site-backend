const Yup = require('yup');
const Clubs = require('../models/Clubs.js');

class ClubsController {
    async store(req, res) {
        const schema = Yup.object().shape({
            club_name: Yup.string().required(),
            club_user: Yup.string().required(),
            abreviate_name: Yup.string().required().length(3),
        });

        try {
            await schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).json({ error: err.errors })
        }

        const { club_name, club_user, abreviate_name } = req.body;
        const { filename: path } = req.file;

        await Clubs.create({
            club_name,
            club_user,
            abreviate_name,
            path,
        })

        return res.status(200).json({ success: 'clube criado com sucesso!' })
    }

    async index(req, res) {
        const clubs = await Clubs.findAll();

        return res.status(200).json(clubs);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            club_name: Yup.string(),
            abreviate_name: Yup.string()
        });

        try {
            await schema.validateSync(req.body, { abortEarly: false })
        } catch (err) {
            return res.status(400).json({ error: err.errors })
        }

        const { club_name, abreviate_name } = req.body;
        const { id } = req.params;

        const clubFind = await Clubs.findByPk(id);

        if (!clubFind) {
            return res.status(401).json({ error: 'clube não existe' })
        };

        let path
        if (req.file) {
            path = req.file.filename;
        };

        await Clubs.update({ club_name, abreviate_name, path },
            { where: { id } }
        );

        return res.status(200).json({ success: 'clube atualizado com sucesso!' })
    }

    async delete(req, res) {
        const { id } = req.params;

        const clubFind = await Clubs.findByPk(id);

        if (!clubFind) {
            return res.status(400).json({ error: 'clube não existe' })
        };

        await Clubs.destroy({
            where: { id }
        })

        return res.status(200).json({ success: 'clube deletado com sucesso!' })
    }
};

module.exports = new ClubsController();
