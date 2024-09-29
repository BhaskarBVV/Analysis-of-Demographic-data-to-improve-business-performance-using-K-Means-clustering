from flask import make_response

class ResponseHelper:

    @staticmethod
    def send_response(http_status_code, message = None, error = None, **kwargs):
        response_dict = {
            "status": "failed" if error else "success",
            "message": error if error else str(message)
        }
        print(response_dict)
        response = make_response(response_dict, http_status_code)
