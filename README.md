## APIATIZER - CLI

This project has as goal, reduce development time spend.

### How to install

1. npm i apiatizer -g

### Commands

```
> apiatizer endpoint:create <model_name>
```

> This command allows you create model, controller and route automatically.
> You gonna find a few form in order to create
 
#### Add param name:

Here, you can add a new param/prop name for the schema <model_name>.

Please, just use a string camelCase for this.

#### Choose a type :

Now, you need to choose a type for the above parameter. Please just type the number of the option.

In the specific case of the **ObjectId** inmediatly after, you must to select the model for the dependency relationship.

Be careful with the number option.

#### Add new param : 

Finally, you can choose add new param or close the schema.

### Output

The final output is a full schema created for mongoose and their controller, route and relationships.

```
[HABITS.AI]: Model test created
[HABITS.AI]: Controller test created
[HABITS.AI]: Route test created
[HABITS.AI]: Route test added to _api.routes
```
