## Setup instructions for Backend

Open a teminal and move into the backend directory
then run the following command

```bash
virtualenv venv
# OR you can also do (if you have venv installed in python)
# python -m venv venv
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

This will start a development server at [localhost:5000](localhost:5000)

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


## Setup instructions for Frontend

Move into the frontend directory and first install the node modules by running 
### `npm install`


In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
