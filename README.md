# Yassss - Yet another simple static site starter
## [gb Studio](http://grantblakeman.com), built by [Grant Blakeman](http://twitter.com/gblakeman)

### Basics

**Yassss** is a [Jekyll](https://jekyllrb.com/) app that builds static content. It assumes deployment to Amazon S3 via CircleCI. In addition to the base Jekyll install, it adds support for a `content` section that parsed with [Markdown](https://daringfireball.net/projects/markdown/), a [Formcarry](https://formcarry.com/) contact form, and a [Mailchimp](https://mailchimp.com) email capture integration.

### Setup

Be sure to copy `_config.example.yml` and name it `_config.yml`. If you are planning on deploying with CircleCI, leave the `.example` version in place and set your environment variables.

Install everything with:

`yarn install`

The `bundle install` command will be run first. You can always run it separately as well.

### Deployment

Connect your repo to a [CircleCI](https://circleci.com) account.

Make sure the following environment variables are set:

* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`
* `FORMCARRY_FORM_ID`

### Content

Any Markdown files added to the `_content` directory can be called via the `content` tag and will be parsed through the Markdown parser.

```
{% content about.md %}
```

### JS Validation

Use the `GBValidations` script for lightweight form validation.

Available validations:

* `presence`
* `email` (loose validation – better to get some false positives than to be strict…)
* `url`
* `phone`

#### Validate several fields on a form

To validate an entire form, simply add the class `.live-validation` to the form and then add a `validates` data attribute to each input, containing the validations type(s).

```html
<form class="live-validation">
  <input type="text" name="first_name" data-validates="presence" />
  <input type="email" name="email" data-validates="presence email" />
</form>
```

Make sure `GBValidations.listenForValidations()` is called on the page.

#### Call validation from other scripts

You can validate a specific attribute from other JS scripts in the following way:

```javascript
const validation = 'email'
GBValidations.validateProperty(validation, fieldElement).check
```

The `.check` will return either `true` or `false` depending on whether or not the validation has passed.
