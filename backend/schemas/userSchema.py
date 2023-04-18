def user_serializer(user) -> dict:
    return {
        'id':str(user["_id"]),
        'username':user["username"],
        'email':user["email"],
        'password':user["password"],
        'profileImage':user["profileImage"]
       
    }


def users_serializer(users) -> list:
    return [user_serializer(user) for user in users] 