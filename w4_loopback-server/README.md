# My Application

The project is generated by [LoopBack](http://loopback.io).

**Getting Started with loopback**

Objectives and Outcomes:
- Use Loopback to quickly scaffold out a server-side application
- Use Loopback to define a model and automatically let it construct the corresponding REST API

```
npm install strongloop -g
slc loopback
slc loopback:model
node .
```

**Loopback Data Sources and Access Control**

Objectives and Outcomes:
- Define data sources to be used by your Loopback server
- Set up access controls to various REST API end points.

```
slc loopback:datasource
slc loopback:acl
```

3 AC rules:
- Deny access to everyone for all the routes.
- Enable GET access to all authenticated users
- Allow only Admins to perform all operations