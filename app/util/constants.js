const dateformat = require('dateformat');

exports.MESSAGES = {
    models: {
        question: {
            create: {
                200: 'Question added.',
                500: 'Invalid array or parameters.'
            },
            delete: {
                200: 'Question deleted.',
                404: 'Question does not exist or invalid parameters.'
            },
            findOneRandomly: {
                404: 'Not enough result.'
            },
            findById: {
                404: 'Question not found.',
                500: 'Invalid parameters.'
            }
        },
        reponse: {
            create: {
                200: 'Reponse added.',
                500: 'Invalid parameters.'
            },
            delete: {
                200: 'Reponse deleted.',
                404: 'Reponse does not exist or invalid parameters.'
            },
            findById: {
                404: 'Reponse not found.',
                500: 'Invalid parameters.'
            }
        },
        serveur: {
            create: {
                200: 'Server added.',
                500: 'Server already exist or invalid parameters.'
            },
            delete: {
                200: 'Server deleted.',
                404: 'Server does not exist or invalid parameters.'
            },
            createIfNotExists: {
                200: "server(s) has(have) been added.",
                404: "No server added."
            },
            deleteIfNotExists: {
                200: "server(s) has(have) been deleted.",
                404: "No server removed."
            },
            addMember: {
                200: 'Member added to Server.',
                500: 'Member already in Server.',
                404: 'Server or User not found.'
            },
            delMember: {
                200: 'Member removed from Server.',
                404: 'Server or User not found.',
                500: 'Member not in Server.'
            },
            update: {
                200: 'Server updated.',
                404: 'Server not found.',
                500: 'Update failed. Invalid parameters.'
            },
            findById: {
                404: 'Server not found.',
                500: 'Invalid parameters.'
            }
        },
        point: {
            addWin: {
                200: 'Win added to User.',
                500: 'Invalid parameters.',
                404: [
                    'Point not found.',
                    'Server or User not found.'
                ]
            },
            remWin: {
                200: 'Win removed to User.',
                500: 'Point can\'t be less than zero.',
                404: [
                    'Point not found.',
                    'Server or User not found.'
                ]
            },
            findPoint: {
                404: [
                    'Point not found.',
                    'Server or User not found.'
                ]
            }
        },
        user: {
            create: {
                200: 'User added.',
                500: 'User already exist or invalid parameters.'
            },
            delete: {
                200: 'User deleted.',
                404: 'User does not exist or invalid parameters.'
            },
            update: {
                200: 'User updated.',
                404: 'User not found.',
                500: 'Update failed. Invalid parameters.'
            },
            findById: {
                404: 'User not found.',
                500: 'Invalid parameters.'
            }
        }
    },
    infos: {
        message: 'Bienvenu sur l\'API LimiteJs',
        version: process.env.npm_package_version,
        author: process.env.npm_package_author_name,
        library: 'Express.js',
        uptime: dateformat(new Date(), 'dd-mm-yyyy')
    }
}