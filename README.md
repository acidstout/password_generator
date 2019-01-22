# Password Generator

Simple PHP based password generator.

- Generates passwords of unlimited length and selectable complexity
- Includes a basic strength meter.
- Random background images fading in and out.
- BeOS style, draggable application window.

All requests against the PHP script are done by AJAX calls. In general JSON is returned.

## Testing environment

### Requirements

- Virtualbox >= 5.2.4
- Vagrant >= 2.0.1
- Vagrant Plugins:
  - vagrant-winnfsd # required for nfs shares on Windows
  - vagrant-vbguest # recommended for virtualbox users

### Quickstart

1. git clone https://github.com/acidstout/password_generator.git
2. cd password_generator
3. vagrant up --provider=virtualbox
4. ... wait ...
5. Open the password generator in your browser: http://192.168.56.154/

# Credits
Thanks go to
- [Samuel Scrimshaw](https://unsplash.com/@samscrim) for those nice background images
- [Niklas Vosskötter](https://github.com/neikei) for the Vagrant integration
