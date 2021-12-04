mongo -- "$MONGO_INITDB_DATABASE" << EOF
    use admin;
    db.createUser({
        user: "$MONGO_INITDB_ROOT_USERNAME",
        pwd: "$MONGO_INITDB_ROOT_PASSWORD",
        roles: [
            {
                role: "userAdminAnyDatabase",
                db: "$MONGO_INITDB_DATABASE",
            },
            "readWriteAnyDatabase"
        ],
    });
    use kraken;
EOF
