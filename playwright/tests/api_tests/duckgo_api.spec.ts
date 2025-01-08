import { expect, test } from "@playwright/test";

test("api test", async({request}) =>{
    const response = await request.get("https://api.duckduckgo.com/?q=the+simpsons&format=json");
    const body = await response.json();
    //console.log(body)
    const related_topics = body.RelatedTopics;
    //console.log(related_topics)
    console.log(`status: ${response.status()}`)
    if(!Array.isArray(related_topics))
    {
        throw new Error("no related topics found");
    }
    
    let icons_counter = 1;
    related_topics.forEach(topic =>{
        if(topic.Icon){
            if(topic.Icon.URL){
                console.log(`${icons_counter}.- url: ${topic.Icon.URL}`);
            }
            else{
                console.log(`${icons_counter}.- there was not url value`);
            }
            icons_counter++;
        }
    });    
});