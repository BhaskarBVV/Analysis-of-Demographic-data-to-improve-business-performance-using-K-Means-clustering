from http import HTTPStatus
from flask_restful_swagger_2 import Resource, swagger
from helpers.messages import Message
from helpers.response_helper import ResponseHelper


class HealthCheck(Resource):

    @swagger.doc({})
    def get(self):
        return ResponseHelper.send_response(HTTPStatus.OK.value, Message.healthy)