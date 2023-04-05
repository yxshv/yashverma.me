A few days ago I wrote my first blog and wanted to make a website for it. So I made one using `Next.js` and `MDX`. While making it I got an idea. What if you could just write a blog in github and it will appear automatically in a website. So I did just that. created a Github app which listens for push events and automatically updates the website, and also added comments support using [`giscus`](https://giscus.app/)

This blog will teach you how to set it up.

First create a repository. its need to public, then go the [website](https://blogs-for-u.vercel.app/) and log in with github. then pick the repo u created, and install the app, and there you go - u can see your blog here - `https://blogs-for-u.vercel.app/u/<github_username>`

## Attributes
You can add attributes like this

```yaml:blog.md
data:
  - title: Blog Title
  - dsc: Blog Description
  - date: 2022-06-01 # year-month-day format (ISO 8601)
  - meta:
    - title: Meta Title
    - description: Meta Description
    - image: Meta Image
---
```
> Make sure to add `---` after the attributes (even if there are no attributes)

## Comments

Now at the bottom of the blog u might see an error
```bash:error
giscus not installed on this repository
```
This is because giscus is not set up

First install the [`giscus`](https://github.com/apps/giscus) app then enable discussion on the repository (Settings > Scroll Down > Enable Discussion). After that go back to the blogs and You should see the comments.

If you like this app you considering starring ⭐ the [repo](https://github.com/kekda-py/blogs)