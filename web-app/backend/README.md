## Setup instructions

```bash
virtualenv venv
source venv/bin/activate

# You can add these 2 lines to venv/bin/activate
# Otherwise run this in every new terminal
export PYTHONPATH=$PYTHONPATH:$(pwd)
export FLASK_APP=app:app

pip install -r requirements.txt

cp .env.template .env
```

Edit the variables in `.env` file you just created.
The secret key can be any random string.
The rest are specific to you.

## Opening development server

```bash
soure venv/bin/activate
flask run
```


## Database management

Currently our ORM doesn't have support `ALTER TABLE`.
So any change in the database means you need to delete and re-create the table.

To create all tables:

```bash
flask db migrate
```

To delete all tables:

```bash
flask db dropall
```

Have a look at `app/models/base.py` to understand our current capabilites.
You can exploit them in a `flask shell`.