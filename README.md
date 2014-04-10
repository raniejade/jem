# jem - Java Environment Manager
Manage multiple versions of java (jdk/jre).

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

### Setting up
Add this to your *.bashrc* file (or something equivalent).

```
export JAVA_HOME=`jem java-home`
export PATH="$PATH:$JAVA_HOME/bin"
```

Now you can run any (common) java commands. The commands you can run depends on the type (jdk/jre) of the currently
configured java. See next section for implementation details.

## Under the hood
**UNDER CONSTRUCTION**
