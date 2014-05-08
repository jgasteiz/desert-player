# The Desert Player

Web player with Django in the BE and Angularjs in the FE.

## Running the thing locally

- `pip install -r requirements.txt`
- `bower install`
- In `music_player/settings.py` change MEDIA_ROOT value to the absolute path where your music directory is.
- Run `./syncdb.sh`
- Run `./get_media.sh`
- Run `./serve.sh`
