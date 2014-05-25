# jem - Java Environment Manager
Manage multiple versions of java (jdk/jre). Don't expect this to run on windows!

## Installation
```
npm install -g jem
```

## Usage
### Install
```
jem install <name> <absolute/path/to/jdk/or/jre>
```

### Uninstall
```
jem uninstall <name>
```

### List installed
```
jem list
```

### Switching jdk/jre
```
jem set <name>
```

### Running a command
```
jem exec <command>
```
This will use the current candidate to execute the command.

### Setting up
Add this to your *.bashrc* file (or something equivalent).

```
source ~/.jem/source
```
Now you can run any (common) java commands. The commands you can run depends on the type (jdk/jre) of the currently
configured java.
